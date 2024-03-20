//THIRD PARTY MODULES
import { processHtml } from '_@landing/utils/wordFormat';
import { downloadFile } from '_@landing/utils/download-file';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
import DownloadIcon from '_@shared/icons/DownloadIcon';

type Props = { dish?: RouterOutputs['dishes']['getDishById'] };

export default function IngredientsRecipe({ dish }: Props) {
  if (!dish) return null;

  return (
    <div className="px-6 lg:px-[unset]">
      <div className="text-blu-400">
        <p className="text-16 text-blu-400">Ingredients</p>
        {dish.ingredients ? (
          <div
            className="rich-text mt-2"
            dangerouslySetInnerHTML={{ __html: processHtml(dish.ingredients.trim()) }}
          />
        ) : (
          <p className="mt-6 text-12lig text-blu-200 md:text-14lig">
            Sorry, we don't have an ingredient list for this dish yet.
          </p>
        )}
        <p className="mt-8 text-16 text-blu-400">Recipe</p>
        {dish.recipe ? (
          <div
            className="rich-text mt-2"
            dangerouslySetInnerHTML={{ __html: processHtml(dish.recipe.trim()) }}
          />
        ) : (
          <p className="mt-6 text-12lig text-blu-200 md:text-14lig">
            Sorry, we don't have a recipe for this dish yet.
          </p>
        )}
      </div>
      {dish.pdf && dish.pdfName ? (
        <Button
          variant="ghost"
          className="mt-4 lg:mt-6"
          leadingIcon={<DownloadIcon />}
          onClick={() =>
            dish.pdf &&
            dish.pdfName &&
            downloadFile((process.env.NEXT_PUBLIC_DOWNLOAD_URL as string) + dish.pdf, dish.pdfName)
          }
        >
          Download Ingredients & Recipe
        </Button>
      ) : null}
    </div>
  );
}
