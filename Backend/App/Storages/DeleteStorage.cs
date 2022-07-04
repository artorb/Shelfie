using Domain.Models;
using MediatR;
using Persistence;

namespace App.Storages;

public class DeleteStorage
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
            var storage = await _ctx.Storages.FindAsync(request.Id, cancellationToken);
            _ctx.Remove(storage);

            await _ctx.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}