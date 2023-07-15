import { DatetimeService } from "@/util/date-time.service";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";

@ValidatorConstraint()
export class IsBeforeNowConstraint implements ValidatorConstraintInterface {
  validate(value: number) {
    const dateService = new DatetimeService()
    return value <= dateService.getCurrentTimestamp();
  }

  defaultMessage(args: ValidationArguments) {
    return `Date ${args.property} can not before now.`;
  }
}

export function IsBeforeNow(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBeforeNowConstraint,
    });
  };
}