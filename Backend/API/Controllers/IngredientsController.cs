using System.Net;
using System.Security.Claims;
using App.Ingredients;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;
using Persistence.DTO.Ingredient;

// ReSharper disable HeapView.BoxingAllocation

namespace API.Controllers
{
    [Authorize]
    [EnableCors("CorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientsController : BaseApiController
    {
        private readonly ILogger<IngredientsController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public IngredientsController(ILogger<IngredientsController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(GetIngredientDto), (int)HttpStatusCode.OK)]
        [ProducesErrorResponseType(typeof(StatusResponseDto))]
        public async Task<ActionResult<GetIngredientDto>> GetIngredient(Guid id, CancellationToken ct)
        {
            try
            {
                var ingredient = await Mediator.Send(new DetailsIngredient.Query(dtoId: id), ct);
                return Ok(ingredient);
            }
            catch
            {
                return NotFound();
            }
        }


        [HttpPut("{id:guid}")]
        public async Task<IActionResult> EditIngredient(Guid id, [FromBody] PutIngredientDto ingredientDto)
        {
            return Ok(await Mediator.Send(new EditIngredient.Command(ingredientDto, id)));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Ingredient), (int)HttpStatusCode.OK)]
        [ProducesErrorResponseType(typeof(StatusResponseDto))]
        public async Task<ActionResult<List<GetIngredientDto>>> GetAllIngredients(CancellationToken ct)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
            return Ok(await Mediator.Send(new ListAllIngredients.Query(userId), ct));
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.Created)]
        [ProducesErrorResponseType(typeof(StatusResponseDto))]
        public async Task<IActionResult> CreateIngredient([FromBody] PostIngredientDto ingredient, CancellationToken ct)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var response = await Mediator.Send(new CreateIngredient.Command(ingredient, userId), ct);
                return StatusCode((int)HttpStatusCode.Created, value: response);
            }
            catch (Exception ex)
            {
                return BadRequest(new StatusResponseDto()
                {
                    Success = false,
                    Error = ex.Message
                });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteIngredient(Guid id, CancellationToken ct)
        {
            return Ok(await Mediator.Send(new DeleteIngredient.Command(id: id), ct));
        }
    }
}