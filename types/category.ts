import { FormErrors } from './form';

export type CategoryType = 'expense' | 'income';

export class Category {
  public id?: number;
  public name: string;
  public type: CategoryType;
  public icon: string;
  public strokeColor: string;
  public backgroundColor: string;
  public userId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    data: CategoryFormValues &
      Partial<{ id: number; userId: string; createdAt: Date; updatedAt: Date }>,
  ) {
    this.name = data.name;
    this.type = data.type;
    this.icon = data.icon;
    this.strokeColor = data.strokeColor;
    this.backgroundColor = data.backgroundColor;

    if (data.id != null) this.id = data.id;
    if (data.userId != null) this.userId = data.userId;
    if (data.createdAt) this.createdAt = new Date(data.createdAt);
    if (data.updatedAt) this.updatedAt = new Date(data.updatedAt);
  }

  static fromDb(dbResult: Record<string, any>): Category {
    return new Category({
      id: dbResult.id,
      name: dbResult.name,
      type: dbResult.type,
      icon: dbResult.icon,
      strokeColor: dbResult.stroke_color,
      backgroundColor: dbResult.background_color,
      userId: dbResult.user_id,
      createdAt: new Date(dbResult.created_at),
      updatedAt: new Date(dbResult.updated_at),
    });
  }
}

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
}

export type CategoryFormErrors = FormErrors<CategoryFormValues>;

export interface CategoryIcon {
  src: string;
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
