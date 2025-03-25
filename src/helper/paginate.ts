import { plainToClass } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

const paginationCustom = async ({
  repository,
  page,
  size,
  search,
  searchFields,
  dto,
  sort,
  filters,
}: {
  repository: any;
  page: number;
  size: number;
  search?: string;
  searchFields?: any;
  options?: any;
  dto?: any;
  sort?: any;
  filters?: any;
}) => {
  const queryBuilder: SelectQueryBuilder<any> =
    repository.createQueryBuilder('entity');

  // 1. Thêm điều kiện tìm kiếm (search)
  if (search && searchFields.length > 0) {
    const searchConditions = searchFields
      .map((field) => `entity.${field} ILIKE :search`)
      .join(' OR ');
    queryBuilder.andWhere(`(${searchConditions})`, { search: `%${search}%` });
  }

  // 2. Thêm bộ lọc (filters)
  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined) {
        queryBuilder.andWhere(`entity.${key} = :${key}`, {
          [key]: filters[key],
        });
      }
    });
  }

  // 3. Thêm sắp xếp (sort)
  if (sort?.field) {
    queryBuilder.orderBy(`entity.${sort.field}`, sort.order);
  }

  // 4. Phân trang
  queryBuilder.skip((page - 1) * size).take(size);

  // 5. Thực hiện truy vấn
  const [data, total] = await queryBuilder.getManyAndCount();

  // 6. Convert DTO nếu có
  const resultConvertDto = dto
    ? plainToClass(dto, data, { excludeExtraneousValues: true })
    : data;

  return {
    pageCurrent: page,
    totalPage: Math.ceil(total / size),
    totalItems: total,
    data: resultConvertDto,
  };
};

export default paginationCustom;
