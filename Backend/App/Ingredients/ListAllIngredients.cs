using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.DTO.Ingredient;

namespace App.Ingredients;

public class ListAllIngredients
{
    public class Query : IRequest<List<GetIngredientDto>>
    {
        public string UserId { get; set; }

        public Query(string userId)
        {
            UserId = userId;
        }
    }


    public class Handler : IRequestHandler<Query, List<GetIngredientDto>>
    {
        private readonly ShelfyContext _ctx;
        private readonly IMapper _mapper;

        public Handler(ShelfyContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<List<GetIngredientDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var userId = request.UserId;
            var ingredients = await Queryable.OrderByDescending(_ctx.Ingredients.Where(ingredient => ingredient.ApplicationUserId.Equals(userId))
                    .Include(c => c.Storage), i => i.Created)
                .ProjectTo<GetIngredientDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);

            return ingredients;
        }
    }
}