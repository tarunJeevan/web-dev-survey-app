using FirebaseAdmin.Auth;
using Newtonsoft.Json.Linq;
using SurveyAPI.Interfaces;
using System.Security.Claims;
using System.Text;

namespace SurveyAPI.Services
{
    public class TokenService : ITokenService
    {
        private IConfiguration m_configuration { get; }
        public TokenService(IConfiguration a_configuration)
        {
            m_configuration = a_configuration;
        }

        /// <summary>
        /// Validates a user access token
        /// </summary>
        /// <returns>True if token is a valid and unexpired token</returns>
        public async Task<bool> ValidateToken(string a_token)
        {
            try
            {
                string token = a_token.Substring(6).Trim();
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
                string uid = decodedToken.Uid;

                DateTime issued = DateTimeOffset.FromUnixTimeSeconds(decodedToken.IssuedAtTimeSeconds).UtcDateTime;
                DateTime expires = DateTimeOffset.FromUnixTimeSeconds(decodedToken.ExpirationTimeSeconds).UtcDateTime;

                if (issued <= DateTime.Now.ToUniversalTime() && expires > DateTime.Now.ToUniversalTime())
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        /// <summary>
        /// Gets the role of the user from the db using the uid from the specified token
        /// </summary>
        /// <param name="a_token"></param>
        /// <returns></returns>
        public async Task<string> GetUserRoleFromToken(string a_token)
        {
            try
            {
                string token = a_token.Substring(6).Trim();
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
                string uid = decodedToken.Uid;

                //Todo going to query the db using the uid to get the role type here
                return "admin";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "error";
            }
        }
    }
}
