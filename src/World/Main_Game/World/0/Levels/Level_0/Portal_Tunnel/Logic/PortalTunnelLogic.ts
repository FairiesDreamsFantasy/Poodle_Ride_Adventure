import { GameState } from '../../../../../../../../System/Engine/Core/Types';
import { PORTAL_TUNNEL_DIMENSIONS } from '../Dimensions/PortalTunnelDimensions';

export function handlePortalTunnelLogic(state: GameState): Partial<GameState> | null {
  if (state.area !== 'PortalTunnel') return null;

  // Teleportation Zone Check
  // The tunnel is 200ft long. Teleport zone is last 50ft (gridY 150 to 200).
  if (state.gridY >= PORTAL_TUNNEL_DIMENSIONS.height - PORTAL_TUNNEL_DIMENSIONS.teleportZoneDepth) {
    // Check if at the very end
    if (state.gridY >= PORTAL_TUNNEL_DIMENSIONS.height - 5) {
      return {
        area: 'WandaPlatform',
        gridX: 50, // Center of WandaPlatform (100x100)
        gridY: 10,
        level: 'Floor'
      };
    }
  }

  return null;
}
