using BCrypt.Net;

namespace mwm_app.Server.Services
{
    public class PasswordHashingService 
    {
        // Salt same as client side
        private const int SaltRounds = 10;

        public string HashPassword(string password)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, SaltRounds);
            return hashedPassword;
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, hashedPassword);
            return isValidPassword;
        }
    }
}