import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripeModuleAsyncOptions, StripeModuleOptions } from './module-options.interface';
import { StripeService } from './stripe.service';

@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        {
          provide: 'STRIPE_CONFIG_OPTIONS',
          useValue: options,
        },
        StripeService,
      ],
      exports: [StripeService],
    };
  }

  static registerAsync(options: StripeModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: StripeModule,
      imports: options.imports || [],
      providers: [...asyncProviders, StripeService],
      exports: [StripeService],
    };
  }

  private static createAsyncProviders(options: StripeModuleAsyncOptions): Provider[] {
    return [
      {
        provide: 'STRIPE_CONFIG_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }
}
