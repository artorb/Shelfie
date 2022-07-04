using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Storages;

public class DetailsStorage
{
    public class Query : IRequest<Storage>
    {
        public Guid Id { get; set; }

        public Query(Guid id)
        {
            Id = id;
        }


        public class Handler : IRequestHandler<Query, Storage>
        {
            private readonly ShelfyContext _ctx;

            public Handler(ShelfyContext ctx)
            {
                _ctx = ctx;
            }

            public async Task<Storage> Handle(Query request, CancellationToken cancellationToken)
            {
                return (await _ctx.Storages.SingleOrDefaultAsync(ing => ing.Id == request.Id,
                    cancellationToken: cancellationToken))!;
            }
        }
    }
}