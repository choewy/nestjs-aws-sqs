import { InvalidNodeEnvError } from './app-config.error';
import { AppConfigHelper } from './app-config.helper';
import { NodeEnv } from './enums';

describe('AppConfigHelper', () => {
  const JEST_NODE_ENV = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.NODE_ENV = JEST_NODE_ENV;
  });

  describe('Check Test Environment', () => {
    it('테스트 환경에서는 NODE_ENV가 NodeEnv.TEST로 정의되어야 한다.', () => {
      expect(AppConfigHelper.nodeEnv).toEqual(NodeEnv.TEST);
    });

    it('테스트 환경에서는 envFilePath가 .env.test로 정의되어야 한다.', () => {
      expect(AppConfigHelper.envFilePath).toEqual('.env.test');
    });
  });

  describe('Throw Error Case', () => {
    it('환경변수에 NODE_ENV가 없으면 InvalidNodeEnvError 던진다.', () => {
      process.env.NODE_ENV = undefined;

      expect(() => AppConfigHelper.nodeEnv).toThrowError(InvalidNodeEnvError);
    });

    it('환경변수에 NODE_ENV가 있으나, NodeEnv 타입이 아니면 InvalidNodeEnvError 던진다.', () => {
      process.env.NODE_ENV = 'invalid NODE_ENV';

      expect(() => AppConfigHelper.nodeEnv).toThrowError(InvalidNodeEnvError);
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 NODE_ENV가 있고, NodeEnv 타입이 맞으면 값을 반환한다.', () => {
      expect(Object.values(NodeEnv)).toContain(AppConfigHelper.nodeEnv);
    });

    it('환경변수에 NODE_ENV가 있고, NodeEnv 타입이 맞으면 값을 반환한다.', () => {
      expect(Object.values(NodeEnv)).toContain(AppConfigHelper.nodeEnv);
    });

    it('테스트 환경이 아닌 경우, envFilePath는 .env가 되어야 한다.', () => {
      process.env.NODE_ENV = NodeEnv.LOCAL;

      expect(AppConfigHelper.envFilePath).toEqual('.env');
    });
  });
});
