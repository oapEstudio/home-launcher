import { CustomBox } from "../../ui/box/CustomBox";
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CustomDivider from "../../ui/divider";
import destacadoUno from './../../../../../public/assets/img/destacadoUno.png';
import destacadoDos from './../../../../../public/assets/img/destacadoDos.png';
import destacadoTres from './../../../../../public/assets/img/destacadoTres.png';
import destacadoCuatro from './../../../../../public/assets/img/destacadoCuatro.png';
import { CardsGrid } from "./components/CardsGrid";
import "./relevant-applications.css";

export type QuickLink = {
  id: string; label: string; href: string;
  description?: string; target?: "_self" | "_blank";
  order: number; isActive: boolean; tags?: string[];
};

const imgArrayhoverRelevant = [destacadoUno, destacadoDos, destacadoTres, destacadoCuatro];

export default function RelevantApplications({ items }: { items: QuickLink[] }) {
  const list = (items ?? []).slice(0, 4);

  return (
    <CustomBox sx={{ py: 4, position: 'relative', marginTop: '-5%', zIndex: '1', 
                    '&:hover .title': {        
                      display: 'block'
                    } }}>
      <Container style={{ maxWidth: '100%' }}>    
        <>
          {
            items && items.length > 0 && 
             <CustomBox className="title" sx={{
                    display: 'none', 
                    mb: 2
                }}>
                    <Typography color="#AAAAAA" sx={{ fontWeight: 700, position: "relative" }}>
                      Accesos rápidos
                    </Typography>
                    <CustomDivider style={{width: '45%', marginTop: '1px !important' }} />
            </CustomBox>    
          }
        
        </>
        <CardsGrid>
          {list.map((q, index) => {
            const hoverBg = imgArrayhoverRelevant[index];

            return (
            
                <Card
                key={q.id}
                  sx={{
                    position: 'relative',
                    borderRadius: 1,
                    backgroundColor: '#e8effa',
                    border: "1px solid",
                    borderColor: "#CFCFCF",
                    height: { xs: 250, md: 250 },
                    overflow: "hidden",

                  
                    '&:hover .hover-bg': { opacity: 1 },
                    '&:hover .hover-blue': { opacity: 1 },
                    '&:hover .text-white-hover': { color: 'white' },
                    '&:hover .divider': { backgroundColor: 'white !important' },
                  }}
                >
                 
                  <CustomBox
                    className="hover-bg"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${hoverBg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0,
                      transition: "opacity 200ms ease",
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  />

                 
                  <CustomBox
                    className="hover-blue"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      transition: "opacity 200ms ease",
                      backgroundColor: '#0451DDCC', 
                      backdropFilter: 'blur(0.5px)',
                      WebkitBackdropFilter: 'blur(0.5px)', 
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                      zIndex: 1,
                     
                    }}
                  />

                  <CardActionArea
                   component="a"                             
                    href={q.href}              
                    target={q.target ?? "_blank"}             
                    rel={q.target === "_blank" ? "noopener noreferrer" : undefined}
                    sx={{
                      position: "relative",
                      height: "100%",
                     
                    }}
                  >
                    <CardContent
                        sx={{
                          position: "relative",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          paddingTop: '15%',
                          minWidth: 0,
                          overflow: "hidden",
                          zIndex: 2,
                        }}
                      >
                        <Typography
                          className="text-white-hover"
                          variant="h5"
                          fontSize="1.1rem"
                          textTransform="uppercase"
                          sx={{
                            fontWeight: 600,
                            minWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                            hyphens: "auto",
                            display: "-webkit-box",
                            //WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {q.label}
                        </Typography>

                        <CustomDivider style={{ width: '40%', backgroundColor: 'black' }} className="divider" />

                        <Typography
                          variant="body2"
                          className="text-white-hover"
                          sx={{
                            minWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                            hyphens: "auto",
                            display: "-webkit-box",
                           // WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {q.description ?? "Descripción del acceso"}
                        </Typography>
                    </CardContent>

                  </CardActionArea>
                </Card>
             
            );
          })}
        </CardsGrid>
      </Container>
    </CustomBox>
  );
}
