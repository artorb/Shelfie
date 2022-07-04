using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Recipes;

public class ListAllRecipes
{
    public class Query : IRequest<List<Recipe>>
    {
        public string ApplicationUserId { get; }

        public Query(string applicationUserId)
        {
            ApplicationUserId = applicationUserId;
        }
    }


    public class Handler : IRequestHandler<Query, List<Recipe>>
    {
        private readonly ShelfyContext _ctx;
        private readonly IMapper _mapper;

        public Handler(ShelfyContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<Recipe>> Handle(Query request, CancellationToken cancellationToken)
        {
            var recipes = await _ctx.Recipes.Where(recipe => recipe.ApplicationUserId == request.ApplicationUserId)
                .OrderByDescending(x => x.Created)
                // .ProjectTo<GetRecipeDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);

            return recipes;
        }
    }
}