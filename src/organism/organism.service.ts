import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganismDto } from './dto/create-organism.dto';
import { UpdateOrganismDto } from './dto/update-organism.dto';
import { Organism } from './entities/organism.entity';
import { FindOrganismDto } from './dto/find-organism.dto';
import { AuthService } from '../auth/auth.service';
import { SaveOrganismDto } from './dto/save-organism.dto';

@Injectable()
export class OrganismService {
  constructor(
    @InjectRepository(Organism)
    private organismRepository: Repository<Organism>,
  ) {}

  async create(saveOrganismDto: SaveOrganismDto) {
    return this.organismRepository.save(saveOrganismDto);
  }

  async findAll() {
    return this.organismRepository.find();
  }
  async findAllSortedAndPaginated(findOptions: FindOrganismDto) {
    const queryBuilder = this.organismRepository.createQueryBuilder('organism');
    const orderBy = findOptions.orderBy ? findOptions.orderBy : 'createdAt';
    const sort = findOptions.sort
      ? findOptions.sort === 'ASC'
        ? 'ASC'
        : 'DESC'
      : 'ASC';
    const page = findOptions.page ? findOptions.page : 1;
    const perPage = findOptions.perPage ? findOptions.perPage : 10;

    queryBuilder
      .orderBy(`organism.${orderBy}`, sort)
      .offset((page - 1) * perPage)
      .limit(perPage)
      .leftJoinAndSelect('organism.contactPerson', 'contactPerson');
    const total = await queryBuilder.getCount();
    return {
      data: await queryBuilder.getMany(),
      total,
      page,
      numberOfPages: Math.ceil(total / perPage),
    };
  }

  async findOne(id: number) {
    return this.organismRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrganismDto: UpdateOrganismDto) {
    const organism = await this.organismRepository.preload({
      id,
      ...updateOrganismDto,
    });
    if (!organism) {
      throw new NotFoundException(`organism with id ${id} does not exist`);
    }
    return this.organismRepository.save(organism);
  }

  async remove(id: number) {
    const result = await this.organismRepository.softDelete(id);
    if (result.affected) return result;
    throw new NotFoundException(`organism with id ${id} does not exist`);
  }
}
