using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Entities;
using DatingApp.API.Extensions;
using DatingApp.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.API.Controllers
{
    public class AccountController(AppDbContext context, ITokenService tokenService ):BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
        {
            if (await EmailExists(dto.Email))
                return BadRequest("Email Taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                DisplayName = dto.DisplayName,
                Email = dto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)),
                PasswordSalt = hmac.Key
            };

            context.users.Add(user);
            await context.SaveChangesAsync();

            return user.AddDto(tokenService);

        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto dto)
        {
            var user = await context.users.FirstOrDefaultAsync(u => u.Email==dto.Email);

            if (user == null)
                return Unauthorized("Email Not Found");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));

            //comparing each byte with the byte stored in db if one byte fails then wrong pw
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid Password");
            }

            return user.AddDto(tokenService);
        }
        private async Task<bool> EmailExists(string email)
        {
             return await context.users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }
    }
}
