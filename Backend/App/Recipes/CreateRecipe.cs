using AutoMapper;
using Domain.Models;
using MediatR;
using Persistence;
using Persistence.DTO.Storage;

namespace App.Recipes;

public class CreateRecipe
{
    public class Command : IRequest
    {
        public Recipe Recipe { get; set; }
        public string UserId { get; set; }

        public Command(Recipe recipe, string userId)
        {
            Recipe = recipe;
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
            var recipe = new Recipe();

            // _mapper.Map(request.RecipeDto, recipe);

            recipe.ApplicationUserId = request.UserId;
            recipe.Created = DateTime.UtcNow;

            await _ctx.Recipes.AddAsync(recipe, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}