import type { INotificationCarousel, ISlide } from "../../../../domain/entities/ISlide";

export const toSlide = (data: INotificationCarousel): ISlide => {
    
    const slide: ISlide = {
        id: data.notificationTypeId.toString(),
        imageUrl: data.imagenLink,
        title: data.title,
        order: 1,
        isActive: true,
        cta: data.buttonText?{href: data.buttonLink, label: data.buttonText, target: '_blank'}: undefined,
        subtitle: data.description
    };

    return slide;
}