using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.DTO.Storage;

namespace App.Storages;

public class EditStorage
{
    public class Command : IRequest
    {
        public Command()
        {
        }

        public Command(PutStorageDto storageDto, Guid id)
        {
            StorageDto = storageDto;
            DtoId = id;
        }

        public PutStorageDto StorageDto { get; set; }
        public Guid DtoId { get; }
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
            try
            {
                var storage = await _ctx.Storages.SingleOrDefaultAsync(ing => ing.Id == request.DtoId,
                    cancellationToken: cancellationToken);

                if (storage == null)
                {
                    throw new Exception("Couldn't find storage");
                }

                _mapper.Map(request.StorageDto, storage);

                _ctx.Storages.Update(storage!);
                await _ctx.SaveChangesAsync(cancellationToken);
            }
            catch (Exception)
            {
                await Console.Error.WriteLineAsync($"Failed to update {request.StorageDto.Name}");
                return Unit.Value;
            }

            return Unit.Value;
        }
    }
}