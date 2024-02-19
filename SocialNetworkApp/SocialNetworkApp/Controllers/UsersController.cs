using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialNetworkApp.Data;
using SocialNetworkApp.DTOs;
using SocialNetworkApp.Entities;
using SocialNetworkApp.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace SocialNetworkApp.Controllers;

[Authorize]
public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper) {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")] //   api/users/2
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }
    
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null) return NotFound();

            _mapper.Map(memberUpdateDTO, user);

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
         }
    
}
