
import { lemonSqueezySetup, listStores } from '@lemonsqueezy/lemonsqueezy.js';

async function getStoreId() {
  const apiKey = 'EyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI2MGU2MzBjYThkMjM1NGJmOTUzNGQwODU1ZGFlODhiMDY2NWI3MTQ5NTlmMWYzN2EwNDAxNzRhNTg2ZWE3Y2VjMDNmZmJlZjc1MzExMjI2YyIsImlhdCI6MTc3NzE4ODcyNy41MTA3NTksIm5iZiI6MTc3NzE4ODcyNy41MTA3NjEsImV4cCI6MTc5Mjk3MjgwMC4wNDE1MTIsInN1YiI6IjY5MDIzMjYiLCJzY29wZXMiOltdfQ.RjzQ7b1KeNxZ0FfGc_u6EUeOUlnSsQTLqACH_ag65JoqrAgsRCtfYLgsBstxdgyfnwaTltLPP7JKbwxorrgdJ70eyL6cphTNvd61xHAz8rFikkW8W0DVWj0DRNjJtCfoSaD1oRHnYCYfUtx_PZOcCF05g2-Srpum0EPM9obSLFFELY4mOgoHHWHIodQkwfk0Tutwmc-Z9ch2zdiUMwV_KlgFGFbyjE1K_J6mW3ywb09ERly3t5kAnVCciUxaAC_djnXQvK2Gy1q0Uz4SvFgmk2HioeM9dk3dth1hlLjCNW92koS8-KqHsTdGouPxMsP1IpCk35uqj3G0H9y0BCirK0MTpD0Lc9GHwdJHBwuIRYssc44x6IP4uz_K3P7lx0sPp7-zdK7kgrQLx0UuE-s3A1bsEf0My-JCJkufbkqQy3zbjfDRn2brctc7-o2qYxa873JVRCKq0RbnCb-ow_WhC9O9sNZlYkfgHhKn25zcB76k6rQtY93mTR5qyvY4bo9YFMNwJCIQZxwahM_Do1Vzncf6oHNx5NvtWpg85IHq_mhV_fLHJunGte_AdkQjaY2aAzY2h2wWeBxn4CbKbSg1Uhl5rA5evBLdh61zEAwyiYN_nMNCaZRN8Ko1gynSF2WDoXcso5P4FIt3dZLLth0ebD6L0R8zf-eSqz0zDJ59DJc';
  
  lemonSqueezySetup({ apiKey });

  try {
    const { data, error } = await listStores();
    if (error) {
      console.error('Error fetching stores:', error.message);
      return;
    }

    if (data && data.data.length > 0) {
      console.log('STORES_FOUND:');
      data.data.forEach(store => {
        console.log(`ID: ${store.id}, Name: ${store.attributes.name}`);
      });
    } else {
      console.log('No stores found for this API key.');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

getStoreId();
