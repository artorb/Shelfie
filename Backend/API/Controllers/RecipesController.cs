using System.Net;
using System.Security.Claims;
using App.Recipes;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;

// ReSharper disable HeapView.BoxingAllocation

namespace API.Controllers;

[Authorize]
[ApiController]
[EnableCors("CorsPolicy")]
[Route("api/[controller]")]
public class RecipesController : BaseApiController
{
    public RecipesController()
    {
    }

    [HttpGet]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(Recipe), (int)HttpStatusCode.OK)]
    [ProducesErrorResponseType(typeof(StatusResponseDto))]
    public async Task<ActionResult<IEnumerable<StatisticsDto>>> GetRecipes(CancellationToken ct)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok(await Mediator.Send(new ListAllRecipes.Query(userId!), ct));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> EditStorage(Guid id, [FromBody] Recipe recipe)
    {
        return Ok(await Mediator.Send(new EditRecipe.Command(recipe, id)));
    }

    [HttpPost]
    public async Task<IActionResult> CreateStorage([FromBody] Recipe recipe, CancellationToken ct)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok(await Mediator.Send(new CreateRecipe.Command(recipe, userId!), ct));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteStorage(Guid id, CancellationToken ct)
    {
        return Ok(await Mediator.Send(new DeleteRecipe.Command(id: id), ct));
    }
}