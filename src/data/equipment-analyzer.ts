export interface SensorProfile { id: string; name: string; pixel: number; width: number; height: number; source: string; checked: string; pixelSource?: string; }
export interface SmartProfile extends SensorProfile { aperture: number; focal: number; }
export interface FovReference { id: string; widthDeg: number; heightDeg: number; shape: 'circle' | 'ellipse' | 'nebula'; image?: string; imageScale?: number; }

// Official source and verification date live beside each preset to keep updates auditable.
export const cameraProfiles: SensorProfile[] = [
  { id: 'asi294mm-bin1', name: 'ZWO ASI294MM Pro · Bin 1', pixel: 2.3, width: 8288, height: 5644, source: 'https://us.zwoastro.com/products/asi294', checked: '2026-09-04' },
  { id: 'asi294mm-bin2', name: 'ZWO ASI294MM Pro · Bin 2', pixel: 4.6, width: 4144, height: 2822, source: 'https://us.zwoastro.com/products/asi294', checked: '2026-09-04' },
  { id: 'asi294mc', name: 'ZWO ASI294MC Pro', pixel: 4.63, width: 4144, height: 2822, source: 'https://us.zwoastro.com/products/asi294', checked: '2026-09-04' },
  { id: 'asi2600mm', name: 'ZWO ASI2600MM Pro', pixel: 3.76, width: 6248, height: 4176, source: 'https://www.zwoastro.com/product/new-asi2600mm-mc-pro/', checked: '2026-09-04' },
  { id: 'asi2600mc', name: 'ZWO ASI2600MC Pro', pixel: 3.76, width: 6248, height: 4176, source: 'https://www.zwoastro.com/product/new-asi2600mm-mc-pro/', checked: '2026-09-04' },
  { id: 'asi120mm-s', name: 'ZWO ASI120MM-S', pixel: 3.75, width: 1280, height: 960, source: 'https://www.zwoastro.com/2019/08/02/asi-planetary-camera-selection-guide/', checked: '2026-09-04' },
  { id: 'asi120mc-s', name: 'ZWO ASI120MC-S', pixel: 3.75, width: 1280, height: 960, source: 'https://www.zwoastro.com/2019/08/02/asi-planetary-camera-selection-guide/', checked: '2026-09-04' },
  { id: 'asi1600mm', name: 'ZWO ASI1600MM', pixel: 3.8, width: 4656, height: 3520, source: 'https://i.zwoastro.com/zwo-website/manuals/ASI1600_Manual_EN_V1.5.pdf', checked: '2026-09-04' },
  { id: 'asi1600mc', name: 'ZWO ASI1600MC', pixel: 3.8, width: 4656, height: 3520, source: 'https://i.zwoastro.com/zwo-website/manuals/ASI1600_Manual_EN_V1.5.pdf', checked: '2026-09-04' },
  { id: 'asi533mc', name: 'ZWO ASI533MC Pro', pixel: 3.76, width: 3008, height: 3008, source: 'https://www.zwoastro.com/compare/', checked: '2026-09-04' },
  { id: 'touptek-atr2600c', name: 'ToupTek ATR2600C · ATR3CMOS26000KPA', pixel: 3.76, width: 6224, height: 4168, source: 'https://www.touptek-astro.com/dl_manual/ATR2600C_en.pdf', checked: '2026-09-04' },
  { id: 'asi585', name: 'ZWO ASI585MC/MM Pro', pixel: 2.9, width: 3840, height: 2160, source: 'https://us.zwoastro.com/products/asi585mc-mm-pro', checked: '2026-09-04' },
];

export const guideCameraProfiles: SensorProfile[] = [
  { id: 'asi120mm-s-guide', name: 'ZWO ASI120MM-S', pixel: 3.75, width: 1280, height: 960, source: 'https://www.zwoastro.com/2019/08/02/asi-planetary-camera-selection-guide/', checked: '2026-09-04' },
  { id: 'asi120mc-s-guide', name: 'ZWO ASI120MC-S', pixel: 3.75, width: 1280, height: 960, source: 'https://www.zwoastro.com/2019/08/02/asi-planetary-camera-selection-guide/', checked: '2026-09-04' },
  { id: 'asi220mm-mini', name: 'ZWO ASI220MM Mini', pixel: 4, width: 1920, height: 1080, source: 'https://us.zwoastro.com/products/zwo-asi220mm-minimono', checked: '2026-09-04' },
  { id: 'asi174mm', name: 'ZWO ASI174MM', pixel: 5.86, width: 1936, height: 1216, source: 'https://us.zwoastro.com/products/asi174mm-mono', checked: '2026-09-04' },
  { id: 'qhy5iii678m', name: 'QHY QHY5III678M', pixel: 2, width: 3856, height: 2180, source: 'https://www.qhyccd.com/qhy5iii678/', checked: '2026-09-04' },
  { id: 'qhy5iii462m', name: 'QHY QHY5III462M', pixel: 2.9, width: 1920, height: 1080, source: 'https://www.qhyccd.com/specifications-comparison/', checked: '2026-09-04' },
  { id: 'qhy5iii585m', name: 'QHY QHY5III585M', pixel: 2.9, width: 3856, height: 2180, source: 'https://www.qhyccd.com/qhy5iii585/', checked: '2026-09-04' },
];

export const smartProfiles: SmartProfile[] = [
  { id: 's30', name: 'Seestar S30', aperture: 30, focal: 150, pixel: 2.9, width: 1920, height: 1080, source: 'https://www.seestar.com/products/seestar-s30-all-in-one-smart-telescope', pixelSource: 'https://www.sony-semicon.com/files/62/pdf/p-12_IMX662-AAQR_AAQR1_Flyer.pdf', checked: '2026-09-04' },
  { id: 's50', name: 'Seestar S50', aperture: 50, focal: 250, pixel: 2.9, width: 1920, height: 1080, source: 'https://us.seestar.com/blogs/review/review-of-the-seestar-s50-smart-telescope-by-zwo', checked: '2026-09-04' },
  { id: 's30-pro', name: 'Seestar S30 Pro', aperture: 30, focal: 160, pixel: 2.9, width: 3840, height: 2160, source: 'https://us.seestar.com/products/seestar-s30-pro', pixelSource: 'https://www.sony-semicon.com/en/news/2021/2021062901.html', checked: '2026-09-04' },
  { id: 's50-pro', name: 'Seestar S50 Pro', aperture: 50, focal: 260, pixel: 2.9, width: 3840, height: 2160, source: 'https://us.seestar.com/products/seestar-s50-pro-smart-telescope', checked: '2026-09-04' },
];

// Approximate apparent extents used only as familiar framing references.
export const fovReferences: FovReference[] = [
  { id: 'moon', widthDeg: 0.52, heightDeg: 0.52, shape: 'circle', image: '/imagenes/luna-referencia-fov.png' },
  { id: 'm13', widthDeg: 0.33, heightDeg: 0.33, shape: 'circle', image: '/imagenes/cielo-profundo/M13.jpg' },
  { id: 'm42', widthDeg: 1.42, heightDeg: 1, shape: 'nebula', image: '/imagenes/cielo-profundo/M42.jpg' },
  { id: 'm101', widthDeg: 0.48, heightDeg: 0.45, shape: 'ellipse', image: '/imagenes/cielo-profundo/M101.jpg' },
  { id: 'm31', widthDeg: 3.17, heightDeg: 1, shape: 'ellipse', image: '/imagenes/cielo-profundo/M31.jpg' },
  { id: 'jupiter', widthDeg: 0.014, heightDeg: 0.014, shape: 'circle' },
];
