using System.Net;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;

namespace API.Controllers;

[AllowAnonymous]
[ApiController]
[EnableCors("CorsPolicy")]
[Route("api/[controller]")]
public class StatisticsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public StatisticsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType(typeof(StatisticsDto), (int)HttpStatusCode.OK)]
    [ProducesErrorResponseType(typeof(StatusResponseDto))]
    public async Task<ActionResult<IEnumerable<StatisticsDto>>> GetStatistics()
    {
        var storages = await _unitOfWork.StorageRepository.GetAllWithIncludesAsync(c => c.Ingredients);

        var enumerable = storages.ToList();

        var list = (from storage in enumerable
        let amber = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("amber", StringComparison.InvariantCultureIgnoreCase))
        let blue = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("blue", StringComparison.InvariantCultureIgnoreCase))
        let fuchsia = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("fuchsia", StringComparison.InvariantCultureIgnoreCase))
        let green = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("green", StringComparison.InvariantCultureIgnoreCase))
        let red = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("red", StringComparison.InvariantCultureIgnoreCase))
        let sky = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("sky", StringComparison.InvariantCultureIgnoreCase))
        let slate = storage.Ingredients.Count(ingredient => ingredient.ColorTag!.Equals("slate", StringComparison.InvariantCultureIgnoreCase))
        select new StatisticsDto()
        {
            Amber = amber,
            Blue = blue,
            Fuchsia = fuchsia,
            Green = green,
            Red = red,
            Sky = sky,
            Slate = slate,
            StorageName = storage.Name,
            StorageId = storage.Id.ToString(),
            TotalAmount = storage.Ingredients.Count
        }).ToList();

        return Ok(list);
    }
}