using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.DTO.Ingredient;

namespace App.Ingredients;

public class ListAllIngredients
{
    // public class Query : IRequest<List<GetIngredientDto>>
    public class Query : IRequest<List<GetIngredientDto>>
    {
    }


    public class Handler : IRequestHandler<Query, List<GetIngredientDto>>
    // public class Handler : IRequestHandler<Query, List<GetIngredientDto>>
    {
        private readonly ShelfyContext _ctx;
        private readonly IMapper _mapper;

        public Handler(ShelfyContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetIngredientDto>> Handle(Query request, CancellationToken cancellationToken)
        // public async Task<List<Ingredient>> Handle(Query request, CancellationToken cancellationToken)
        {
            var ingredients = await _ctx.Ingredients.Include(c => c.Storage)
                .OrderByDescending(i => i.Created)
                .ProjectTo<GetIngredientDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);
            // return ingredients;


            return ingredients;
            // return ingredients.Select(ingredient => _mapper.Map<GetIngredientDto>(ingredient)).ToList();
        }
    }
}