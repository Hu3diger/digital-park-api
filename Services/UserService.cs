﻿using digitalpark.Data;
using digitalpark.Entity;
using digitalpark.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using digitalpark.Model;

namespace digitalpark.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(long id);
        User Create(RegisterModel user, string password);
        void Update(User user, string password = null);
        void Delete(long id);
    }

    public class UserService : IUserService
    {
        private DigitalParkContext _context;

        public UserService(DigitalParkContext context)
        {
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.SaltHash))
                return null;

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(long id)
        {
           return _context.Users.Find(id);
        }

        public User Create(RegisterModel user, string password)
        {
            User dbUser = new();

            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Username == user.Username))
                throw new AppException("Username '" + user.Username + "' is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            
            dbUser.Username = user.Username;
            dbUser.Email = user.Email;
            dbUser.PasswordHash = passwordHash;
            dbUser.SaltHash = passwordSalt;

            _context.Users.Add(dbUser);
            _context.SaveChanges();

            return dbUser;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.ID);

            if (user == null)
                throw new AppException("User not found");

            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                if (_context.Users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username '" + userParam.Username + "' is already taken");

                user.Username = userParam.Username;
            }

            if (!string.IsNullOrWhiteSpace(userParam.Email))
                user.Email = userParam.Email;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.SaltHash = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(long id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
