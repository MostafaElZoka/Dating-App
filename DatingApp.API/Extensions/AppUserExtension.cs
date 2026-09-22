using DatingApp.API.DTOs;
using DatingApp.API.Entities;
using DatingApp.API.Interfaces;

namespace DatingApp.API.Extensions
{
    public static class AppUserExtension
    {
        public static UserDto AddDto(this AppUser user, ITokenService tokenService)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Id = user.Id,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
