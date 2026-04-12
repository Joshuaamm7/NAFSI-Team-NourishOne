import React from 'react';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import MapView from '../components/ryan/MapView';

// --- Mocks for react-leaflet (JSDOM doesn't support Leaflet's DOM requirements) ---

let mockMapProps = {};
let mockMarkers = [];

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, center, zoom, style }) => {
    mockMapProps = { center, zoom, style };
    return <div data-testid="map-container" style={style}>{children}</div>;
  },
  TileLayer: ({ url, attribution }) => (
    <div data-testid="tile-layer" data-url={url} data-attribution={attribution} />
  ),
  Marker: ({ children, position }) => {
    mockMarkers.push({ position });
    return <div data-testid="marker" data-position={JSON.stringify(position)}>{children}</div>;
  },
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
}));

jest.mock('leaflet/dist/leaflet.css', () => {});

beforeEach(() => {
  mockMapProps = {};
  mockMarkers = [];
});

// --- 6.1: Unit Tests ---

describe('MapView — Unit Tests', () => {
  test('renders map container element', () => {
    render(<MapView />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  test('MapContainer receives PG County center and zoom 11', () => {
    render(<MapView />);
    expect(mockMapProps.center).toEqual([38.83, -76.85]);
    expect(mockMapProps.zoom).toBe(11);
  });

  test('renders with empty locations array (no markers, no errors)', () => {
    render(<MapView locations={[]} />);
    expect(screen.queryAllByTestId('marker')).toHaveLength(0);
  });

  test('renders with null locations (no crash)', () => {
    render(<MapView locations={null} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.queryAllByTestId('marker')).toHaveLength(0);
  });

  test('renders with undefined locations (no crash)', () => {
    render(<MapView locations={undefined} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.queryAllByTestId('marker')).toHaveLength(0);
  });

  test('renders 3 markers when given 3 sample locations', () => {
    const locations = [
      { lat: 38.81, lng: -76.91, name: 'Location A', address: '123 Main St' },
      { lat: 38.85, lng: -76.88, name: 'Location B', address: '456 Oak Ave' },
      { lat: 38.79, lng: -76.93, name: 'Location C', address: '789 Elm Rd' },
    ];
    render(<MapView locations={locations} />);
    expect(screen.getAllByTestId('marker')).toHaveLength(3);
  });

  test('responsive container has min-height class', () => {
    render(<MapView />);
    const container = screen.getByTestId('map-container').parentElement;
    expect(container.className).toContain('min-h-');
  });
});

// --- 6.2: Property Test — Marker placement correctness ---

describe('MapView — Property: Marker placement correctness', () => {
  test('renders exactly one Marker per valid location at the correct position', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            lat: fc.double({ min: -90, max: 90, noNaN: true, noDefaultInfinity: true }),
            lng: fc.double({ min: -180, max: 180, noNaN: true, noDefaultInfinity: true }),
            name: fc.string({ minLength: 1 }),
          }),
          { minLength: 0, maxLength: 50 }
        ),
        (locations) => {
          mockMarkers = [];
          const { unmount } = render(<MapView locations={locations} />);

          expect(mockMarkers).toHaveLength(locations.length);
          locations.forEach((loc, i) => {
            expect(mockMarkers[i].position).toEqual([loc.lat, loc.lng]);
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// --- 6.3: Property Test — Popup content correctness ---

describe('MapView — Property: Popup content correctness', () => {
  test('each Popup contains the location name, and address if provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          lat: fc.double({ min: -90, max: 90, noNaN: true, noDefaultInfinity: true }),
          lng: fc.double({ min: -180, max: 180, noNaN: true, noDefaultInfinity: true }),
          name: fc.string({ minLength: 1 }),
          address: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
        }),
        (location) => {
          mockMarkers = [];
          const { unmount, container } = render(<MapView locations={[location]} />);

          const popups = container.querySelectorAll('[data-testid="popup"]');
          expect(popups).toHaveLength(1);

          const popupText = popups[0].textContent;
          expect(popupText).toContain(location.name);

          if (location.address) {
            expect(popupText).toContain(location.address);
          }

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
