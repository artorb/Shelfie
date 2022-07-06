using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.DTO.Ingredient;

namespace App.Ingredients;

public class DetailsIngredient
{
    public class Query : IRequest<GetIngredientDto>
    {
        public Guid DtoId { get; set; }

        public Query(Guid dtoId)
        {
            DtoId = dtoId;
        }


        public class Handler : IRequestHandler<Query, GetIngredientDto>
        {
            private readonly ShelfyContext _ctx;
            private readonly IMapper _mapper;

            public Handler(ShelfyContext ctx, IMapper mapper)
            {
                _ctx = ctx;
                _mapper = mapper;
            }

            public async Task<GetIngredientDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var ingredient = (await _ctx.Ingredients.SingleOrDefaultAsync(ing => ing.Id == request.DtoId,
                    cancellationToken: cancellationToken))!;

                var ingredientDto = new GetIngredientDto();
                _mapper.Map(ingredient, ingredientDto);

                return ingredientDto;
            }
        }
    }
}