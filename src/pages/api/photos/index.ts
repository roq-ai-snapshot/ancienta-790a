import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { photoValidationSchema } from 'validationSchema/photos';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPhotos();
    case 'POST':
      return createPhoto();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPhotos() {
    const data = await prisma.photo
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'photo'));
    return res.status(200).json(data);
  }

  async function createPhoto() {
    await photoValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.comment?.length > 0) {
      const create_comment = body.comment;
      body.comment = {
        create: create_comment,
      };
    } else {
      delete body.comment;
    }
    if (body?.favorite?.length > 0) {
      const create_favorite = body.favorite;
      body.favorite = {
        create: create_favorite,
      };
    } else {
      delete body.favorite;
    }
    const data = await prisma.photo.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
