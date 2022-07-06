using System.Net;
using System.Security.Claims;
using App.Storages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Persistence.DTO;
using Persistence.DTO.Storage;

namespace API.Controllers
{
    [Authorize]
    [EnableCors("CorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class StorageController : BaseApiController
    {
        private readonly ILogger<StorageController> _logger;

        public StorageController(ILogger<StorageController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(GetStorageDto), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetStorageDto>> GetStorage(Guid id, CancellationToken ct)
        {
            try
            {
                var storage = await Mediator.Send(new DetailsStorage.Query(id: id), ct);
                return Ok(storage);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> EditStorage(Guid id, [FromBody] PutStorageDto storageDto)
        {
            return Ok(await Mediator.Send(new EditStorage.Command(storageDto, id)));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(GetStorageDto), (int)HttpStatusCode.OK)]
        [ProducesErrorResponseType(typeof(StatusResponseDto))]
        public async Task<ActionResult<List<GetStorageDto>>> GetAllStorages(CancellationToken ct)
        {
            return Ok(await Mediator.Send(new ListAllStorages.Query(), ct));
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.Created)]
        [ProducesErrorResponseType(typeof(StatusResponseDto))]
        public async Task<IActionResult> CreateStorage([FromBody] PostStorageDto storage, CancellationToken ct)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(await Mediator.Send(new CreateStorage.Command(storage, userId), ct));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteStorage(Guid id, CancellationToken ct)
        {
            return Ok(await Mediator.Send(new DeleteStorage.Command(id: id), ct));
        }
    }
}