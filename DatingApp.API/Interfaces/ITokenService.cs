using DatingApp.API.Entities;

namespace DatingApp.API.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
