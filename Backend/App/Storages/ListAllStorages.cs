using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.DTO.Storage;

namespace App.Storages;

public class ListAllStorages
{
    public class Query : IRequest<List<GetStorageDto>>
    {
        public string ApplicationUserId { get; set; }
    }


    public class Handler : IRequestHandler<Query, List<GetStorageDto>>
    {
        private readonly ShelfyContext _ctx;
        private readonly IMapper _mapper;

        public Handler(ShelfyContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetStorageDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            // var storages = await _ctx.Storages
            //     .Where(str => str.ApplicationUserId == request.ApplicationUserId)
            //     .OrderByDescending(x => x.Created)
            //     .ProjectTo<GetStorageDto>(_mapper.ConfigurationProvider)
            //     .ToListAsync(cancellationToken: cancellationToken);

            var storages = await _ctx.Storages
                .OrderByDescending(x => x.Created)
                .ProjectTo<GetStorageDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);

            return storages;

            // var storages = await _ctx.Storages.ToListAsync(cancellationToken: cancellationToken);
            //
            // return storages.Select(storage => _mapper.Map<GetStorageDto>(storage)).ToList();
        }
    }
}