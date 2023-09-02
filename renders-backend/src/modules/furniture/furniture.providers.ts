import { Furniture } from './entities/furniture.entity';
import { FURNITURE_REPOSITORY } from '../../core/constants';

export const furnitureProviders = [
  {
    provide: FURNITURE_REPOSITORY,
    useValue: Furniture,
  },
];
