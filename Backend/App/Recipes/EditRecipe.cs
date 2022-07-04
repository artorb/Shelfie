using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Recipes;

public class EditRecipe
{
    public class Command : IRequest
    {
        public Command()
        {
        }

        public Command(Recipe recipe, Guid id)
        {
            Recipe = recipe;
            DtoId = id;
        }

        public Recipe Recipe { get; set; }
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

                var recipe = await _ctx.Recipes.SingleOrDefaultAsync(recipe => recipe.Id == request.DtoId);

                if (recipe == null)
                {
                    throw new Exception("Couldn't find storage");
                }

                // _mapper.Map(request.Recipe, recipe);

                _ctx.Recipes.Update(recipe!);
                await _ctx.SaveChangesAsync(cancellationToken);
            }
            catch (Exception)
            {
                await Console.Error.WriteLineAsync($"Failed to update {request.Recipe.Name}");
                return Unit.Value;
            }

            return Unit.Value;
        }
    }
}