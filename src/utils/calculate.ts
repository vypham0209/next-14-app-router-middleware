//THIRD PARTY MODULES
import { DishesInContext } from '_@landing/machine/cart';

export const calcBilling = (dishes: DishesInContext) => {
  let totalCalories = 0;
  let subTotal = 0;

  for (const dish of dishes) {
    let addOnCalories = 0;
    let addOnSubTotal = 0;

    for (const addOn of dish.addons) {
      for (const option of addOn.options) {
        addOnCalories += option.calories || 0;
        addOnSubTotal += option.price || 0;
      }
    }

    totalCalories += dish.amount * ((dish.size?.calories || 0) + addOnCalories);
    subTotal += dish.amount * ((dish.size?.price || 0) + addOnSubTotal);
  }

  return { totalCalories, subTotal: +subTotal.toFixed(2) };
};

export const calcTotalPriceOfDish = (dish: DishesInContext[number]) => {
  const addOnPrice = dish.addons.map((addon) => {
    return addon.options.reduce((total, option) => total + (option?.price ?? 0), 0);
  });

  const addOnPriceTotal = addOnPrice.reduce((sum, price) => sum + price, 0);

  const sizePrice = dish.size?.price;

  return (addOnPriceTotal || 0) + (sizePrice || 0);
};

export const calcTotalCaloriesOfDish = (dish: DishesInContext[number]) => {
  const addOnCalories = dish.addons.map((addon) => {
    return addon.options.reduce((total, option) => total + (option?.calories ?? 0), 0);
  });
  const addOnCaloriesTotal = addOnCalories.reduce((sum, calories) => sum + calories, 0);
  const sizeCalories = dish.size?.calories;
  return (addOnCaloriesTotal || 0) + (sizeCalories || 0);
};
