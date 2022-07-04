using AutoMapper;
using Domain.Models;
using MediatR;
using Persistence;
using Persistence.DTO.Storage;

namespace App.Storages;

public class CreateStorage
{
    public class Command : IRequest
    {
        public PostStorageDto StorageDto { get; set; }
        public string UserId { get; set; }

        public Command(PostStorageDto storageDto, string userId)
        {
            StorageDto = storageDto;
            UserId = userId;
        }

        public Command()
        {
        }
    }


    public class Handler : IRequestHandler<Command>
    {
        private readonly ShelfyContext _ctx;
        private readonly IMapper _mapper;

        public Handler(ShelfyContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var storage = new Storage();

            _mapper.Map(request.StorageDto, storage);

            storage.ApplicationUserId = request.UserId;
            storage.Created = DateTime.UtcNow;

            await _ctx.Storages.AddAsync(storage, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}