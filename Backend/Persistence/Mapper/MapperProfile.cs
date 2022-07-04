using AutoMapper;
using Domain.Models;
using Persistence.DTO.Ingredient;
using Persistence.DTO.Storage;

namespace Persistence.Mapper
{
    public class MapperProfile : Profile
    {
        private static string DefaultTag => "slate";

        public MapperProfile()
        {
            // <----------- Ingredient --------------->
            
            CreateMap<Storage, StorageForIngredientDto>()
                .ForMember(dest => dest.Id, opt
                    => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt
                    => opt.MapFrom(src => src.Name));


            CreateMap<Ingredient, GetIngredientDto>()
                .ForMember(dest => dest.Id, opt =>
                    opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Carbs, opt =>
                    opt.MapFrom(src => src.Carbs))
                .ForMember(dest => dest.Fats, opt =>
                    opt.MapFrom(src => src.Fats))
                .ForMember(dest => dest.Calories, opt =>
                    opt.MapFrom(src => src.Calories))
                .ForMember(dest => dest.Name, opt =>
                    opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Weight, opt =>
                    opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.Type, opt =>
                    opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Picture, opt =>
                    opt.MapFrom(src => src.Picture))
                .ForMember(dest => dest.StorageId, opt =>
                    opt.MapFrom(src => src.StorageId))
                // .ForMember(dest => dest.Storage, opt => 
                //     opt.MapFrom(src => src.Storage))
                .ForMember(dest => dest.Storage, opt =>
                    opt.MapFrom(src => src.Storage))
                .ForMember(dest => dest.Created, opt =>
                    opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.ExpirationDate, opt =>
                    opt.MapFrom(src => src.ExpirationDate))
                .ForMember(dest => dest.StorageId, opt =>
                    opt.MapFrom(src => src.StorageId))
                .ForMember(dest => dest.AmountUnits, opt =>
                    opt.MapFrom(src => src.AmountUnits))
                .ForMember(dest => dest.ColorTag, opt =>
                    opt.MapFrom(src => src.ColorTag))
                .ForMember(dest => dest.Proteins, opt =>
                    opt.MapFrom(src => src.Proteins));

            CreateMap<PostIngredientDto, Ingredient>()
                .ForMember(dest => dest.Id, opt =>
                    opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Carbs, opt =>
                    opt.MapFrom(src => src.Carbs ?? Convert.ToDouble(0)))
                .ForMember(dest => dest.Fats, opt =>
                    opt.MapFrom(src => src.Fats ?? Convert.ToDouble(0)))
                .ForMember(dest => dest.Calories, opt =>
                    opt.MapFrom(src => src.Calories ?? Convert.ToDouble(0)))
                .ForMember(dest => dest.Name, opt =>
                    opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Weight, opt =>
                    opt.MapFrom(src => src.Weight ?? Convert.ToInt32(0)))
                .ForMember(dest => dest.Type, opt =>
                    opt.MapFrom(src => src.Type ?? string.Empty))
                .ForMember(dest => dest.Picture, opt =>
                    opt.MapFrom(src => src.Picture ?? string.Empty))
                //FIXME
                // .ForMember(dest => dest.ExpirationDate ?? DateTime.MinValue,
                // opt =>
                // opt.MapFrom(src =>
                // src.ExpirationDate ?? DateTime.MinValue))
                .ForPath(dest => dest.ExpirationDate,
                    opt =>
                        opt.MapFrom(src =>
                            src.ExpirationDate ?? DateTime.MinValue))
                // .ForPath(dest => dest.ExpirationDate,
                //     opt =>
                //         opt.MapFrom(src =>
                //             DateTime.ParseExact(src.ExpirationDate.ToString() ?? DateTime.MinValue.ToString(CultureInfo.InvariantCulture), "ddd MMM d HH:mm:ss \"UTC\"zzz yyyy", CultureInfo.CurrentCulture)))
                // F
                .ForMember(dest => dest.Storage, opt =>
                    opt.Ignore())
                .ForPath(dest => dest.Storage!.Id, opt =>
                    // opt.MapFrom(src => Guid.Parse(src.StorageId!)))
                    opt.Ignore())
                .ForMember(dest => dest.AmountUnits, opt =>
                    opt.MapFrom(src => src.AmountUnits ?? Convert.ToInt32(0)))
                .ForMember(dest => dest.ColorTag, opt =>
                    opt.MapFrom(src => src.ColorTag ?? DefaultTag)) // default 'non-tagged' color slate
                .ForMember(dest => dest.Proteins, opt =>
                    opt.MapFrom(src => src.Proteins ?? Convert.ToDouble(0)));

            CreateMap<PutIngredientDto, Ingredient>()
                .ForMember(dest => dest.Carbs, opt =>
                    opt.MapFrom(src => src.Carbs))
                .ForMember(dest => dest.Fats, opt =>
                    opt.MapFrom(src => src.Fats))
                .ForMember(dest => dest.Calories, opt =>
                    opt.MapFrom(src => src.Calories))
                .ForMember(dest => dest.Name, opt =>
                    opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Weight, opt =>
                    opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.Type, opt =>
                    opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Picture, opt =>
                    opt.MapFrom(src => src.Picture))
                .ForMember(dest => dest.ExpirationDate, opt =>
                    opt.MapFrom(src => src.ExpirationDate))
                // .ForPath(dest => dest.ExpirationDate, opt =>
                //     opt.MapFrom(src => src.ExpirationDate))
                .ForMember(dest => dest.Storage, opt =>
                    opt.Ignore())
                .ForPath(dest => dest.Storage.Id, opt =>
                    opt.MapFrom(src => Guid.Parse(src.StorageId)))
                .ForMember(dest => dest.AmountUnits, opt =>
                    opt.MapFrom(src => src.AmountUnits))
                .ForMember(dest => dest.ColorTag, opt =>
                    opt.MapFrom(src => src.ColorTag))
                .ForMember(dest => dest.Proteins, opt =>
                    opt.MapFrom(src => src.Proteins));


            // <----------- Storage --------------->

            // CreateMap<GetStorageDto, Storage>()
            CreateMap<Storage, GetStorageDto>()
                .ForMember(dest => dest.Created, opt =>
                    opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.Name, opt =>
                    opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Ingredients, opt
                    => opt.MapFrom(src => src.Ingredients))
                .ForMember(dest => dest.Id, opt =>
                    opt.MapFrom(src => src.Id.ToString()));

            CreateMap<PutStorageDto, Storage>()
                .ForMember(dest => dest.Name, opt =>
                    opt.MapFrom(src => src.Name));

            CreateMap<PostStorageDto, Storage>()
                .ForMember(dest => dest.Name, opt =>
                    opt.MapFrom(src => src.Name));
        }

        public static U MapValidValues<U, T>(T source, U destination)
        {
            // Go through all fields of source, if a value is not null, overwrite value on destination field.
            foreach (var propertyName in source.GetType().GetProperties().Where(p => !p.PropertyType.IsGenericType)
                         .Select(p => p.Name))
            {
                var value = source.GetType().GetProperty(propertyName).GetValue(source, null);
                if (value != null && (value.GetType() != typeof(DateTime) ||
                                      (value.GetType() == typeof(DateTime) && (DateTime)value != DateTime.MinValue)))
                {
                    destination.GetType().GetProperty(propertyName).SetValue(destination, value, null);
                }
            }

            return destination;
        }

        private static double calculateCalories(double proteins, double carbs, double fats)
        {
            return (fats * 9.0) + (carbs * 4.0) + (proteins * 4.0);
        }
    }
}