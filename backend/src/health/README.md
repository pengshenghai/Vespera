# Health Check Module

This module provides comprehensive health monitoring for the NestJS application, including database connectivity, Stellar blockchain connection, and system metrics.

## Features

- **Database Health**: Monitors PostgreSQL connectivity and query execution
- **Stellar Health**: Checks Stellar Horizon server accessibility and network status
- **Memory Health**: Tracks application memory usage with configurable thresholds
- **Graceful Degradation**: Returns partial status when some services fail
- **Timeout Handling**: 5-second timeout for all health checks
- **Detailed Reporting**: Optional detailed system information

## Endpoints

### GET /health
Returns basic health status for all monitored services.

**Response Example:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "uptime": 3600,
  "services": {
    "database": { "status": "ok", "responseTime": 120 },
    "stellar": { "status": "ok", "responseTime": 450 },
    "memory": { "status": "ok", "heapUsed": "45.00 MB" }
  }
}
```

### GET /health/detailed
Returns comprehensive health information including system details.

**Additional Fields:**
- `environment`: Current NODE_ENV
- `details`: Node.js version, platform, architecture, process ID, memory usage

## Status Codes

- **200 OK**: All services healthy or partial failure with graceful degradation
- **503 Service Unavailable**: Critical services are down

## Health Status Values

- **ok**: Service is functioning normally
- **warning**: Service has issues but is partially functional
- **error**: Service is completely unavailable

## Configuration

Environment variables for customization:

```bash
# Stellar Configuration
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Memory Thresholds (in bytes)
MEMORY_WARNING_THRESHOLD=536870912  # 512MB
MEMORY_ERROR_THRESHOLD=1073741824   # 1GB

# Health Check Timeout
HEALTH_CHECK_TIMEOUT=5000  # 5 seconds
```

## Architecture

```
health/
├── health.module.ts          # Module definition
├── health.controller.ts      # HTTP endpoints
├── health.service.ts         # Business logic
└── indicators/
    ├── database.indicator.ts # Database health checks
    ├── stellar.indicator.ts  # Stellar network checks
    └── memory.indicator.ts   # Memory monitoring
```

## Testing

The module includes comprehensive test coverage:

- **Unit Tests**: Individual component testing
- **Integration Tests**: End-to-end endpoint testing
- **Mock Scenarios**: Simulated failure conditions

Run tests:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## Usage in Production

1. **Monitoring Integration**: Use with monitoring tools like Prometheus, DataDog, or New Relic
2. **Load Balancer Health Checks**: Configure load balancers to use `/health` endpoint
3. **Alerting**: Set up alerts based on health status changes
4. **Logging**: Health check failures are automatically logged

## Security Considerations

- Health endpoints are excluded from global API prefix
- Consider rate limiting in production environments
- Detailed endpoint may expose sensitive system information
- Implement authentication for detailed health checks if needed

## Extending Health Checks

To add new health indicators:

1. Create new indicator in `indicators/` directory
2. Implement `HealthIndicator` interface
3. Add to `HealthModule` providers
4. Include in controller health checks

Example:
```typescript
@Injectable()
export class CustomHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    // Implementation
  }
}
```