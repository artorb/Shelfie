using MediatR;
using Persistence;

namespace App.Recipes;

public class DeleteRecipe
{
    public class Command : IRequest
    {
        public Command()
        {
        }

        public Command(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }


    public class Handler : IRequestHandler<Command>
    {
        private readonly ShelfyContext _ctx;

        public Handler(ShelfyContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await _ctx.Recipes.FindAsync(request.Id, cancellationToken);
            _ctx.Remove(recipe);

            await _ctx.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}