import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { BlockchainQueueProcessor, BlockchainJobData } from '../processors/blockchain.processor';
import { StellarService } from '../../stellar/services/stellar.service';
import { PaymentProcessingService } from '../../stellar/services/payment-processing.service';

describe('BlockchainQueueProcessor', () => {
  let processor: BlockchainQueueProcessor;
  let stellarService: StellarService;
  let paymentProcessingService: PaymentProcessingService;

  const mockStellarService = {
    createEscrow: jest.fn(),
    releaseEscrow: jest.fn(),
    refundEscrow: jest.fn(),
    getEscrowById: jest.fn(),
    getTransactionByHash: jest.fn(),
  };

  const mockPaymentProcessingService = {
    processRentPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainQueueProcessor,
        {
          provide: StellarService,
          useValue: mockStellarService,
        },
        {
          provide: PaymentProcessingService,
          useValue: mockPaymentProcessingService,
        },
      ],
    }).compile();

    processor = module.get<BlockchainQueueProcessor>(BlockchainQueueProcessor);
    stellarService = module.get<StellarService>(StellarService);
    paymentProcessingService = module.get<PaymentProcessingService>(PaymentProcessingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleBlockchainJob', () => {
    it('should throw an error for unknown job type', async () => {
      const unknownJob = {
        data: {
          type: 'unknown-type' as any,
          data: {},
        } as BlockchainJobData,
        id: 1,
      } as Job<BlockchainJobData>;

      await expect(processor.handleBlockchainJob(unknownJob)).rejects.toThrow(
        'Unknown blockchain type: unknown-type',
      );
    });

    it('should call sendPayment for send-payment job type', async () => {
      const sendPaymentJob = {
        data: {
          type: 'send-payment' as const,
          data: { paymentId: 'pay_1' },
          paymentId: 'pay_1',
        } as BlockchainJobData,
        id: 1,
      } as Job<BlockchainJobData>;

      await processor.handleBlockchainJob(sendPaymentJob);
      expect(sendPaymentJob.data.type).toBe('send-payment');
    });

    it('should call createEscrow for create-escrow job type', async () => {
      const createEscrowJob = {
        data: {
          type: 'create-escrow' as const,
          data: { agreementId: 'agr_1' },
          agreementId: 'agr_1',
        } as BlockchainJobData,
        id: 2,
      } as Job<BlockchainJobData>;

      await processor.handleBlockchainJob(createEscrowJob);
      expect(createEscrowJob.data.type).toBe('create-escrow');
    });

    it('should call releaseEscrow for release-escrow job type', async () => {
      const releaseEscrowJob = {
        data: {
          type: 'release-escrow' as const,
          data: { agreementId: 'agr_1' },
          agreementId: 'agr_1',
        } as BlockchainJobData,
        id: 3,
      } as Job<BlockchainJobData>;

      await processor.handleBlockchainJob(releaseEscrowJob);
      expect(releaseEscrowJob.data.type).toBe('release-escrow');
    });

    it('should call mintNft for mint-nft job type', async () => {
      const mintNftJob = {
        data: {
          type: 'mint-nft' as const,
          data: { tokenId: 'nft_1' },
        } as BlockchainJobData,
        id: 4,
      } as Job<BlockchainJobData>;

      await processor.handleBlockchainJob(mintNftJob);
      expect(mintNftJob.data.type).toBe('mint-nft');
    });

    it('should call syncTransaction for sync-transaction job type', async () => {
      const syncTransactionJob = {
        data: {
          type: 'sync-transaction' as const,
          data: { transactionId: 'tx_1' },
          transactionId: 'tx_1',
        } as BlockchainJobData,
        id: 5,
      } as Job<BlockchainJobData>;

      await processor.handleBlockchainJob(syncTransactionJob);
      expect(syncTransactionJob.data.type).toBe('sync-transaction');
    });

    it('should call processAnchorTransaction for process-anchor-transaction job type', async () => {
      const processAnchorJob = {
        data: {
          type: 'process-anchor-transaction' as const,
          data: { transactionId: 'anchor_tx_1' },
          transactionId: 'anchor_tx_1',
        } as BlockchainJobData,
        id: 6,
      } as Job<BlockchainJobData>;

      await processor.handleBlockchainJob(processAnchorJob);
      expect(processAnchorJob.data.type).toBe('process-anchor-transaction');
    });
  });
});
