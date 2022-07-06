using AutoMapper;
using Domain.Models;
using MediatR;
using Persistence;
using Persistence.DTO.Ingredient;

namespace App.Ingredients;

public class CreateIngredient
{
    public class Command : IRequest
    {
        public PostIngredientDto IngredientDto { get; set; }
        public string UserId { get; set; }

        public Command(PostIngredientDto ingredientDto, string userId)
        {
            IngredientDto = ingredientDto;
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
            var ingredient = _mapper.Map<Ingredient>(request.IngredientDto);
            ingredient.ApplicationUserId = request.UserId;
            /** Workaround for mapping JS Date object to postgres timestampz, of course not suitable for production  */
            // ingredient.ExpirationDate = ingredient.ExpirationDate!.Value.AddHours(5);

            await _ctx.Ingredients.AddAsync(ingredient, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}