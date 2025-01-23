import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import NodeCache from 'node-cache';
export interface XmlResponse {
  rss: {
    channel: {
      item: {
        'g:id': string;
        'g:title': string;
        'g:price': string;
        'g:sale_price': string;
        'g:custom_label_0': string;
        'g:custom_label_1': string;
        'g:custom_label_2': string;
        'g:custom_label_3': string;
        'g:custom_label_4': string;
        'g:availability': string;
        'g:brand': string;
        'g:mpn': string;
        'g:platform': string;
        'g:region': string;
        'g:updated_timestamp': string;
        'g:condition': string;
        'g:additional_image_link': string[];
        'g:image_link': string;
        'g:link': string;
        'g:product_type': string;
        'g:google_product_category': string;
      }[];
    };
  };
}

export interface Game {
  id: string;
  title: string;
  price: string;
  sale_price: string;
  custom_labels: string[];
  availability: string;
  brand: string;
  mpn: string;
  platform: string;
  region: string;
  updated_timestamp: string;
  condition: string;
  additional_image_link: string[];
  image_link: string;
  link: string;
  product_type: string;
  google_product_category: string;
}
@Injectable()
export class GamesService {
  // private cache = new NodeCache({ stdTTL: 300, checkperiod: 120 }); // Cache TTL: 5 minutes

  // Fetch and convert XML with caching, streaming, and pagination
  private transformProduct(product: Record<string, any>): Record<string, any> {
    const transformedProduct: Record<string, any> = {};
    const customLabels: string[] = [];

    for (const key in product) {
      if (key.startsWith('g:')) {
        const newKey = key.slice(2); // Remove the 'g:' prefix
        // Check for custom_label_* and collect them into an array
        if (newKey.startsWith('custom_label_') && /\d+$/.test(newKey)) {
          customLabels.push(product[key]);
        } else {
          transformedProduct[newKey] = product[key];
        }
      } else {
        transformedProduct[key] = product[key];
      }
    }

    // Add the collected custom labels as a single array field
    transformedProduct.custom_labels = customLabels;

    return transformedProduct;
  }

  // Fetch and convert XML with streaming and pagination
  async fetchAndConvertXML(url: string, page: number, limit: number) {
    try {
      const response = await axios({
        method: 'get',
        url,
        responseType: 'stream', // Stream the response to avoid loading everything in memory
      });

      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
      });

      let xml = '';

      return new Promise<Game[]>((resolve, reject) => {
        response.data.on('data', (chunk) => {
          xml += chunk.toString();
        });

        response.data.on('end', () => {
          try {
            const jsonData = parser.parse(xml); // Convert XML to JSON
            const items = jsonData.rss.channel.item;

            // Transform each product and apply pagination
            const transformedItems: Game[] = items
              .slice((page - 1) * limit, page * limit)
              .map((item: Record<string, any>) => this.transformProduct(item));

            resolve(transformedItems as Game[]);
          } catch (parseError) {
            reject(parseError);
          }
        });

        response.data.on('error', (err) => {
          reject(err);
        });
      });
    } catch (error) {
      console.error('Error fetching or converting XML:', error.message);
      throw new Error('Failed to fetch and convert XML.');
    }
  }
  async create(createGameDto: any) {
    return 'This action adds a new game';
  }

  // Example: Find all games with pagination
  async findAll(page = 1, limit = 10) {
    const xmlUrl =
      'https://cdn.k4g.com/files/feed/google-global-usd-en.xml?limit=10';
    const data = await this.fetchAndConvertXML(xmlUrl, page, limit);
    console.log(data); // Log the data for debugging purposes
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: any) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
