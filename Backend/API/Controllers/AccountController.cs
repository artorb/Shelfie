using System.Security.Claims;
using API.Services;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.DTO.User;

namespace API.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
        TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null)
        {
            return Unauthorized();
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (result.Succeeded)
        {
            return CreateUserObj(user);
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
    {
        if (await _userManager.Users.AnyAsync(c => c.Email == registerDto.Email))
        {
            return BadRequest("Email already taken for registration");
        }

        if (await _userManager.Users.AnyAsync(c => c.Name == registerDto.Username))
        {
            return BadRequest("Username already taken for registration");
        }

        var user = new ApplicationUser()
        {
            UserName = registerDto.Username,
            Name = registerDto.Username,
            Email = registerDto.Email,
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            return CreateUserObj(user);
        }

        return BadRequest("Problem with registering a new user");
    }

    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        return CreateUserObj(user);
    }

    private UserDTO CreateUserObj(ApplicationUser user)
    {
        return new UserDTO
        {
            Name = user.Name,
            Token = _tokenService.CreateToken(user)
        };
    }
}