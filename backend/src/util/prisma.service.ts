import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  async onModuleInit() {
    this.logger.log('Prisma Service Initialization')
    await this.$connect()

    this.$use((params, next) => {
      if (params.action === 'create') {
        params.args.data = {
          ...params.args.data,
          ctm: Date.now(),
          utm: Date.now()
        }
      }

      if (params.action === 'createMany') {
        params.args.data =  params.args.data.map(data => {
          return {
            ...data,
            ctm: Date.now(),
            utm: Date.now()
          }
        })
      }

      if (params.action === 'update') {
        params.args.data = {
          ...params.args.data,
          utm: Date.now()
        }
      }

      if (params.action === 'upsert') {
        params.args.update = {
          ...params.args.update,
          utm: Date.now()
        }

        params.args.create = {
          ...params.args.create,
          ctm: Date.now(),
          utm: Date.now()
        }
      }
      return next(params)
    })

    this.logger.log('Prisma Service Initialization completed.')
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('Prisma Service Destroyed')
  }
}