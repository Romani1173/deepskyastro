import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const traduccioText = z.object({
	objecte: z.string(),
	caracteristiques: z.string(),
});

const traduccioImatge = z.object({
	titol: z.string(),
	descripcio: z.string().optional(),
});

const fotos = defineCollection({
    // 1. Le decimos a Astro que busque en tu nueva carpeta "fotos"
    loader: glob({ base: './src/content/fotos', pattern: '**/*.{md,mdx}' }),
    
    // 2. Definimos tu frontmatter estricto en catalán
    schema: z.object({
        objecte: z.string(),
		imatge: z.string(),
		imatges_addicionals: z.array(z.object({
			tipus: z.enum(['starless', 'crop', 'fov', 'annotated', 'process', 'other']),
			fitxer: z.string(),
			titol: z.string(),
			descripcio: z.string().optional(),
			traduccions: z.object({
				es: traduccioImatge,
				en: traduccioImatge,
			}).optional(),
		})).optional().default([]),
        constellacio: z.string(),
        caracteristiques: z.string(),
		traduccions: z.object({
			es: traduccioText,
			en: traduccioText,
		}).optional(),
        
        // 3. Regla inamovible: Solo permite estas 4 categorías exactas
        categoria: z.enum([
            'Galàxies', 
            'Nebuloses', 
            'Cúmuls i Estrelles', 
            'Sol'
        ]),
        
        equip: z.object({
            ota: z.string(),
            roda_filtres: z.string(),
            enfocador: z.string(),
            guiat: z.string(),
            muntura: z.string(),
        }),
        camera: z.object({
            principal: z.string(),
            filtres: z.string(),
        }),
        exposicio: z.object({
            temps_total: z.string(),
            gain: z.string(),
            offset: z.string(),
            subframes: z.string(),
            calibratge: z.string(),
        }),
        tractament: z.object({
            adquisicio: z.string(),
            processat: z.string(),
        }),
        entorn: z.object({
            lloc: z.string(),
            // 4. Convierte tu fecha ISO automáticamente para poder ordenarlas
            data: z.coerce.date(),
            bortle: z.string(),
            sessions: z.array(z.object({
                inici: z.coerce.date(),
                fi: z.coerce.date().optional(),
                captura: z.string().optional(),
                lloc: z.string().optional(),
            })).optional().default([]),
        }),
    }),
});

const sol = defineCollection({
	loader: glob({ base: './src/content/sol', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		fecha: z.coerce.date(),
		imagen: z.string(),
		comentario: z.string(),
		traducciones: z.object({
			es: z.string(),
			en: z.string(),
		}).optional(),
	}),
});

const articulos = defineCollection({
	loader: glob({ base: './src/content/articulos', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		titulo: z.string(),
		resumen: z.string(),
		fecha: z.coerce.date(),
		tema: z.enum(['Sol', 'Cielo profundo']),
		idioma: z.enum(['ca', 'es', 'en']),
		slug: z.string(),
		translationKey: z.string(),
		portada: z.string(),
		autor: z.string(),
		prueba: z.boolean().optional().default(false),
	}),
});

export const collections = { fotos, sol, articulos };
