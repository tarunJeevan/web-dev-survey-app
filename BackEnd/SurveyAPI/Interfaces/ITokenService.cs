using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyAPI.Interfaces
{
    public interface ITokenService
    {
        Task<bool> ValidateToken(string a_token);

        Task<string> GetUserRoleFromToken(string a_token);

        Task<string> GetUserIDFromToken(string a_token);
    }
}
