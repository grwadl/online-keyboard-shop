import { IsOptional } from 'class-validator';
import { KeyboardType, Switches } from '../entities/product.entity';

class FilterProduct {
  @IsOptional()
  switches?: Switches;

  @IsOptional()
  keycaps?: string;

  @IsOptional()
  type?: KeyboardType;
}

export { FilterProduct };
