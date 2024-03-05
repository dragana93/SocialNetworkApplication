using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkApp.DTOs;
using SocialNetworkApp.Entities;
using SocialNetworkApp.Extensions;
using SocialNetworkApp.Helpers;
using SocialNetworkApp.Interfaces;

namespace SocialNetworkApp.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public MessagesController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDTO>> CreateMessage(CreateMessageDTO createMessageDto)
        {
            var username = User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower())
            {
                return BadRequest("You cannot send message to yourself");
            }

            var sender = await _uow.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await _uow.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var message = new Message()
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            _uow.MessageRepository.AddMessage(message);
            if (await _uow.Complete()) return Ok(_mapper.Map<MessageDTO>(message));

            return BadRequest("Failed to send message");
        }

        [HttpGet]
       public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await _uow.MessageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));

            return messages;
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();

            var message = await _uow.MessageRepository.GetMessage(id);

            if (message.Sender.UserName != username && message.Recipient.UserName != username) return Unauthorized();

            if (message.Sender.UserName == username) message.SenderDeleted = true;

            if (message.Recipient.UserName == username) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted) _uow.MessageRepository.DeleteMessage(message);

            if (await _uow.Complete()) return Ok();

            return BadRequest("Problem deleting the message");
        }

    }

}
