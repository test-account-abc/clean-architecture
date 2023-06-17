import { v4 } from "uuid";
import { IdGenerator } from "../../application/interface/id-generator";
import { injectable } from "inversify";

@injectable()
export class IdGeneratorImpl implements IdGenerator {
  public generate(): string {
    return v4();
  }
}
