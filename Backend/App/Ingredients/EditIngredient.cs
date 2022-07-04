using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.DTO;
using Persistence.DTO.Ingredient;
using Persistence.Mapper;

namespace App.Ingredients;

public class EditIngredient
{
    public class Command : IRequest
    {
        public Command()
        {
        }

        public Command(PutIngredientDto ingredientDto, Guid id)
        {
            IngredientDto = ingredientDto;
            DtoId = id;
        }

        public PutIngredientDto IngredientDto { get; set; }
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
                var ingredient = await _ctx.Ingredients.Where(ing => ing.Id == request.DtoId)
                    .Include(ing => ing.Storage)
                    .Include(ing => ing.Recipes)
                    .FirstOrDefaultAsync(cancellationToken: cancellationToken);

                if (ingredient == null)
                {
                    return default;
                }

                ingredient.Carbs = request.IngredientDto.Carbs ?? ingredient.Carbs;
                ingredient.Fats = request.IngredientDto.Fats ?? ingredient.Fats;
                ingredient.Proteins = request.IngredientDto.Proteins ?? ingredient.Proteins;
                ingredient.Calories = request.IngredientDto.Calories ?? ingredient.Calories;
                ingredient.Weight = request.IngredientDto.Weight ?? ingredient.Weight;
                ingredient.ExpirationDate = request.IngredientDto.ExpirationDate ?? ingredient.ExpirationDate;
                ingredient.Type = request.IngredientDto.Type ?? ingredient.Type;
                ingredient.Name = request.IngredientDto.Name ?? ingredient.Name;
                ingredient.AmountUnits = request.IngredientDto.AmountUnits ?? ingredient.AmountUnits;
                ingredient.Picture = request.IngredientDto.Picture ?? ingredient.Picture;
                ingredient.ColorTag = request.IngredientDto.ColorTag ?? ingredient.ColorTag;
                ingredient.StorageId = (request.IngredientDto.StorageId == null)
                    ? ingredient.StorageId
                    : Guid.Parse(request.IngredientDto.StorageId);

                await _ctx.SaveChangesAsync(cancellationToken);
            }
            catch (Exception)
            {
                await Console.Error.WriteLineAsync($"Failed to update {request.IngredientDto.Name}");
                return Unit.Value;
            }

            return Unit.Value;
        }
    }
}