//THIRD PARTY MODULES
import { z } from 'zod';
import dayjs from 'dayjs';
import { DeliverySlot, DeliveryType, PaymentMethod } from '@prisma/client';
//RELATIVE MODULES
import { CheckOutType } from '../../../types/checkout-type';
import { MEAL_PLAN_PRE_ORDER_DATE_OFFSET, PRE_ORDER_DATE_OFFSET } from '../constant';

export const orderInformationSchema = z
  .object({
    name: z.string().optional(),
    address: z
      .string()
      .max(100, { message: 'The maximum character limit is 100.' })
      .nonempty('This field is required.'),
    phoneNumber: z.string().trim().min(1, 'This field is required.'),
    countryId: z.number(),
    customerName: z
      .string()
      .max(100, { message: 'The maximum character limit is 100.' })
      .nonempty('This field is required.'),
    email: z
      .string()
      .max(100, { message: 'The maximum character limit is 100.' })
      .nonempty('This field is required.')
      .email('Please enter the correct email.')
      .transform((email) => email.toLowerCase()),
    note: z.string().trim().max(200, 'Note should not exceed 200 characters').optional(),
    deliveryType: z.nativeEnum(DeliveryType).default(DeliveryType.RIGHT_AWAY),
    paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.COD),
    date: z.string().optional(),
    time: z.string().optional(),
    type: z.nativeEnum(CheckOutType).default(CheckOutType.Order),
    mealPlanDeliveryDate: z.string().optional(),
    mealPlanDeliverySlot: z.nativeEnum(DeliverySlot).optional(),
  })
  //this refine is use for ORDER
  .refine(
    (data) => {
      return (
        data.type === CheckOutType.MealPlan ||
        data.deliveryType === DeliveryType.RIGHT_AWAY ||
        (data.deliveryType === DeliveryType.PRE_ORDER && data.date)
      );
    },
    {
      message: 'This field is required.',
      path: ['date'],
    },
  )
  .refine(
    (data) => {
      return (
        data.type === CheckOutType.MealPlan ||
        data.deliveryType === DeliveryType.RIGHT_AWAY ||
        (data.deliveryType === DeliveryType.PRE_ORDER && data.time)
      );
    },
    {
      message: 'This field is required.',
      path: ['time'],
    },
  )
  .refine(
    (data) => {
      const preOrderDate = dayjs(`${data.date} ${data.time}`);
      const diffHour = preOrderDate.diff(dayjs().subtract(1, 'minute'), 'hour');
      return (
        data.type === CheckOutType.MealPlan ||
        data.deliveryType === DeliveryType.RIGHT_AWAY ||
        (data.deliveryType === DeliveryType.PRE_ORDER && diffHour >= PRE_ORDER_DATE_OFFSET)
      );
    },
    {
      message: 'Pre-order time must be at least 2 hours in advance.',
      path: ['time'],
    },
  )
  //this refine is use for MEAL PLAN
  .refine(
    (data) => {
      return data.type === CheckOutType.Order || data.mealPlanDeliveryDate;
    },
    {
      message: 'This field is required.',
      path: ['mealPlanDeliveryDate'],
    },
  )
  .refine(
    (data) => {
      return data.type === CheckOutType.Order || data.mealPlanDeliverySlot;
    },
    {
      message: 'This field is required.',
      path: ['mealPlanDeliverySlot'],
    },
  )
  .refine(
    (data) => {
      const preOrderDate = dayjs(data.mealPlanDeliveryDate);
      const diffDay = preOrderDate.diff(dayjs().subtract(1, 'minute'), 'day');
      return data.type === CheckOutType.Order || diffDay >= MEAL_PLAN_PRE_ORDER_DATE_OFFSET;
    },
    {
      message: 'Pre-order date must be at least 48 hours in advance.',
      path: ['mealPlanDeliveryDate'],
    },
  );

export const preOrderDateSchema = z
  .string()
  .refine((dateString) => dayjs().isBefore(dayjs(dateString), 'minute'));

export type OrderInformationValues = z.infer<typeof orderInformationSchema>;

export type ShowAddressFormType = 'DEFAULT' | 'NEW';
